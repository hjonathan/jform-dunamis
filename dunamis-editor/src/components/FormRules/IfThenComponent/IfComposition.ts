import FiniteAutomaton, {
  formatValue,
} from '../../../util/FiniteAutomaton/FiniteAutomaton';
import { onMounted, ref, watch } from 'vue';
import store from '../../../store';
import { IfRule } from '../types';

/***********************************************************************************************************************************
 * COMPOSITION EXTENSION FOR IF COMPONENT
 ***********************************************************************************************************************************/

export const useIfComposition = (props: any) => {
  const data: IfRule = props.data;
  //Init finite automaton
  const automaton = new FiniteAutomaton(data.expression);

  let editingIndex = -1;
  const editing = ref(null),
    items: any = ref([]),
    model: any = ref([]),
    selectedItemEdit = ref(null),
    search = ref(null);

  watch(model, (val, prev) => {
    /**When the value not change */
    if (val.length === prev.length) {
      return;
    }
    model.value = val.map((v: any) => {
      if (typeof v === 'string') {
        v = formatValue(v);
      }
      return v;
    });

    // Edit value in expression
    if (selectedItemEdit.value) {
      updateModelItem(val.pop(), selectedItemEdit.value);
      return;
    }
    if (val.length > prev.length) {
      // Add expression to automaton
      items.value =
        model.value.length > 0
          ? automaton.execute(model.value.at(-1)).getTypesNextState()
          : [];
    } else {
      // Remove Expression from automaton
      items.value = automaton.backExec().getTypesNextState();
    }
  });

  const edit = (index: number, item: any) => {
    const selected = selectedItemEdit.value;
    setTimeout(() => {
      selectedItemEdit.value = selected;
    }, 1000);
    if (!editing.value) {
      editing.value = item;
      editingIndex = index;
    } else {
      editing.value = null;
      editingIndex = -1;
    }
  };

  const onBlurAutocomplete = () => {
    selectedItemEdit.value = null;
  };

  const updateModelItem = (newItem: any, oldItem: any) => {
    let clone: any = Object.assign({}, model.value);
    const index = clone.findIndex((o: any) => Object.is(o, oldItem));

    if (index == 0) {
      clone = newItem.concat(clone.slice(index + 1, clone.length));
    } else {
      clone = [].concat(
        clone.slice(0, index),
        newItem,
        clone.slice(index + 1, clone.length)
      );
    }
    selectedItemEdit.value = newItem;
    model.value = clone;
  };

  const getData = () =>
    Object.assign({}, { expression: transformExpression(model.value) });

  onMounted(() => {
    items.value = automaton.getTypesNextState();
    model.value = automaton.getExpression();
  });

  return {
    editing,
    items,
    model,
    search,

    edit,
    filter,
    onBlurAutocomplete,
    getData,
  };
};
/*************************************************************************************************
 * METHODS
 ************************************************************************************************/

const filter = (item: any, queryText: any, itemText: any) => {
  if (item.header) return false;
  const hasValue = (val: any) => (val != null ? val : '');
  const text = hasValue(itemText);
  const query = hasValue(queryText);
  return (
    text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
  );
};

const transformExpression = (expression: Array<any>) => {
  return expression.map((item: any) => item.format).join(' ');
};

export declare const propsIfComponent: () => {
  expression: {
    required: true;
    type: propsIfComponent;
  };
};
export interface propsIfComponent {
  expression: string;
}
