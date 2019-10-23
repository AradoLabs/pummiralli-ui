import { Reducer } from 'redux'
import { Draft, produce } from 'immer'
import { ActionCreator } from 'typescript-fsa'
import {
  ReducerBuilder,
  reducerWithInitialState,
} from 'typescript-fsa-reducers'

type ExtractPayload<T> = T extends ActionCreator<infer P> ? P : never

// It seems that typescript won't generate intelligent types for recursion if
// the return value doesn't have a defined type.
export interface ImmerWrapper<S> {
  case: <A extends ActionCreator<any>>(
    type: A,
    producer: (state: Draft<S>, payload: ExtractPayload<A>) => void,
  ) => ImmerWrapper<S>

  build: ReducerBuilder<S, S>['build']
}

// Immer's Produce uses Immutable<S> as base, which does not play well
// with ReducerBuilder. Ironically, we have to treat Immer's producer
// function as non-immutable
type Produce<S, T> = (base: S, payload: T) => S

const immerWrapper = <S>(reducer: ReducerBuilder<S, S>): ImmerWrapper<S> => ({
  case: <A extends ActionCreator<any>>(
    type: A,
    producer: (state: Draft<S>, payload: ExtractPayload<A>) => void,
  ) =>
    immerWrapper(
      reducer.case(
        // FIXME cast to any should not be necessary
        type as any,
        produce(producer) as Produce<S, ExtractPayload<A>>,
      ),
    ),

  build: () => reducer.build(),
})

export const immerReducer = <S>(initialState: S) =>
  immerWrapper(reducerWithInitialState(initialState))

// Small utility type for figuring out the props of a connected component
export type Connected<
  StateToProps extends (...args: any[]) => any,
  DispatchToProps extends (...args: any[]) => any = () => {}
> = ReturnType<StateToProps> & ReturnType<DispatchToProps>

// Automatically define root state based on reducers
// Usage: export type RootState = RootStateForReducers<typeof reducers>
export type RootStateForReducers<T extends (...args: any) => any> = ReturnType<
  T
> extends Reducer<infer state, any>
  ? state
  : never
