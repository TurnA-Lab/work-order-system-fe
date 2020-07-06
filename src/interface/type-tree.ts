interface TreeData {
  value?: number;
  label: string;
  disabled?: boolean;
  isLeaf?: boolean;
  children: TreeData[];
}

interface TreeNode<K, D> {
  checked: boolean;
  childNodes: Array<TreeNode<K, D>>;
  data: D;
  expanded: boolean;
  id: number;
  indeterminate: boolean;
  isLeaf: boolean;
  level: number;
  loaded: boolean;
  loading: boolean;
  parent: TreeNode<K, D>;
  store: any;
  visible: boolean;
  disabled: boolean;
  icon: string;
  key: K;
  label: string;
  nextSibling: TreeNode<K, D>;
  previousSibling: TreeNode<K, D>;
  isCurrent: boolean;
}

interface MessageBoxInputData {
  value?: string;
  action?: MessageBoxCloseAction;
}

type MessageBoxCloseAction = "confirm" | "cancel" | "close";

type MessageBoxData = MessageBoxInputData | MessageBoxCloseAction;
