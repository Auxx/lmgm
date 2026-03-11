export interface TreeBranch {
  id: string;
  name: string;
  isOpen: boolean;
  isLoading: boolean;
  needsFetch: boolean;
  children: TreeBranch[];
}
