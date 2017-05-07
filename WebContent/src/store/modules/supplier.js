/**
 * Created by zhuang_w-pc on 4/27/2017.
 */
import * as types from '../mutation-types'
import {
  newIdOfArray,
  currentDateTime,
  formatProductName,
  getFirstCharOfEachWord,
  log} from '../../utils/utils';

import {
  initSuppliers
} from '../../db/init-data'

const imagePath = '/inventory-i18n-task3/WebContent/src/assets/logo.png';

const state = {
  suppliers: [],
  supplierContacts: [],
};

const getters = {
  suppliers: state => state.suppliers,
  supplierContacts: state => state.supplierContacts,
  
  supplierNames: state => state.suppliers.map(s => s.name),
  supplierBrands: state => state.suppliers.map(s => s.brand),
  
  getSupplierById: (state, getters) => (id) => {
    return state.suppliers.find(s => s.id === id);
  },
  
  getSupplierByName: (state, getters) => (name) => {
    return state.suppliers.find(s => s.name === name);
  },
  
  getSupplierNameById: (state, getters) => (id) => {
    let supplier = getters.getSupplierById(id);
    return supplier.name;
  },

  getBrandById: (state, getters) => (id) => {
    let supplier = getters.getSupplierById(id);
    return supplier.brand;
  },
  
  getSupplierByName: (state, getters) => (name) => {
    return state.suppliers.filter(s => s.name === name)[0]
  },
  
  // Supplier Contacts
  getSupplierContactsByName: (state, getters) => (name) => {
    let supplierId = getters.getSupplierByName(name).id;
    return state.supplierContacts.filter((sc) => sc.supplierId === supplierId).map(sc => sc.email);
  },
  
  getSupplierContactByEmail: (state) => (email) => {
    return state.supplierContacts.find(sc => sc.email === email);
  }
  
};

const mutations = {
  [types.INIT_SUPPLIER] (state) {
    let supplierObj = initSuppliers();
    state.suppliers = supplierObj.suppliers;
    state.supplierContacts = supplierObj.supplierContacts;
  },
};

const actions = {
  initSupplier ({commit}) {
    log('init supplier');
    commit(types.INIT_SUPPLIER)
  },
  
};

export default {
  state,
  getters,
  mutations,
  actions
}