/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
export type TabThreeParamList = {
  TabThreeScreen: undefined;
};

type Relation = {
  type: 'hasMany' | 'hasOne'
  column: string
}
type Chain = {
  name: "table_1.table_2"
  tables: Table[]
  rels: Relation[]
}
type Column = {

}
type Table = {

}

