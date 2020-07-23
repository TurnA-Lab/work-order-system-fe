import "@/assets/stylesheet/element-variables.scss";

import {
  Button,
  Card,
  Cascader,
  DatePicker,
  Dialog,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Input,
  Loading,
  Menu,
  MenuItem,
  Notification,
  Option,
  Pagination,
  Popover,
  RadioButton,
  RadioGroup,
  Select,
  Step,
  Steps,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Tooltip,
  Tree,
  Message,
  MessageBox,
  Alert,
  Transfer
} from "element-ui";
import Vue from "vue";

Vue.use(Button);
Vue.use(Card);
Vue.use(Cascader);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Alert);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tabs);
Vue.use(Tooltip);
Vue.use(Transfer);
Vue.use(Tree);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
