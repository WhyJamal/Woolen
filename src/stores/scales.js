import { defineStore } from "pinia";

export const useScalesStore = defineStore("scales", {
  state: () => ({
    rows: JSON.parse(localStorage.getItem("scales_rows") || "[]"),
  }),

  actions: {
    addRow(newRow) {
      this.rows.push({ ...newRow, date: new Date().toISOString() });
      this.saveToLocalStorage();
    },

    removeRow(index) {
      this.rows.splice(index, 1);
      this.saveToLocalStorage();
    },

    clearRows() {
      this.rows = [];
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("scales_rows", JSON.stringify(this.rows));
    },
  },
});