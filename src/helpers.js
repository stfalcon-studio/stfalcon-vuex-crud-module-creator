const mapGettersByProperty = (namespace, fields) => {
  return fields.reduce((acc, current) => {
    const field = {
      get() {
        const getterPath = `${this[namespace]}/${current}`;
        return this.$store.getters[getterPath];
      },
    };

    return {
      ...acc,
      [current]: field,
    };
  }, {});
};

const mapActionsByProperty = (namespace, actions) => {
  return actions.reduce((acc, current) => {
    const action = function(payload) {
      const actionPath = `${this[namespace]}/${current}`;
      return this.$store.dispatch.call(this, actionPath, payload);
    };
    return { ...acc, [current]: action };
  }, {});
};

export {
  mapGettersByProperty,
  mapActionsByProperty
}