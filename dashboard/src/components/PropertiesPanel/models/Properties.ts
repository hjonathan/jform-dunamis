import PropertiesPanel, { PropertyPanel } from './PropertiesInterfaces';
const Props: any = {
  build(id: string) {
    let response: any;
    const prop = PropertiesPanel.find((el: PropertyPanel) => {
      return el.id == id;
    });
    if (prop) {
      response = Object.assign({}, prop);
    } else {
      response = Object.assign({}, PropertiesPanel[0]);
    }
    return response;
  },
};
export default Props;
