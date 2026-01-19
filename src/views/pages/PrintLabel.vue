<template>
  <div class="font-[CeraPro] text-[14px] p-1">
    <table class="w-full border-separate border-spacing-1 table-fixed text-[11px]">
      <tbody>
        <tr>
          <td colspan="2" class="text-center py-2">
            <img
              src="/logos/Woolen.png"
              alt="logo"
              class="mx-auto w-[40px]"
            />
            <div class="text-[10px] font-semibold mt-0.5 text-gray-800">
              WOOLENTEX
            </div>
          </td>
        </tr>

        <tr v-for="(item, index) in infoList" :key="index" class="text-[10px]">
          <td class="w-1/2 font-semibold border border-black px-1">{{ item.label }}</td>
          <td class="w-1/2 border border-black px-1">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center">
      <img
        :src="barcodeImage"
        alt="barcode"
        class="max-w-full h-10"
      />
    </div>

    <div class="text-center text-[10px] font-bold">
      {{ barcodeNumber }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import JsBarcode from "jsbarcode";

const infoList = ref([]);
const barcodeImage = ref("");
const barcodeNumber = ref("");

onMounted(async () => {
  const query = new URLSearchParams(window.location.search);
  const data = query.get("data");

  if (data) {
    try {
      const parsed = JSON.parse(decodeURIComponent(data));
      const order = Array.isArray(parsed) ? parsed[0] : parsed;

      infoList.value = [
        { label: "Order number:", value: order.order || "" },
        { label: "Article name:", value: order.nomenclature || "" },
        { label: "Article number:", value: order.article || "" },
        { label: "Color:", value: order.color || "" },
        { label: "Batch №:", value: order.batch || "" },
        { label: "Number of piece:", value: order.tape_number || "" },
        { label: "Width:", value: order.width || "" },
        { label: "Gross meters:", value: order.brutto || "" },
        { label: "Net meters:", value: order.netto || "" },
        { label: "Gross weight:", value: order.mass || "" },
        { label: "Finish:", value: order.finish || "Standart" },
        { label: "Sort:", value: order.sort || "" },
        { label: "Composition:", value: order.composition || "" },
        { label: "Machine ID:", value: order.machine_id || "" },
        { label: "Worker ID:", value: order.author || "" },
      ];

      barcodeNumber.value = order.components || "";

      if (barcodeNumber.value) {
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, barcodeNumber.value, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 50,
          displayValue: false,
          background: "transparent",
        });

        barcodeImage.value = canvas.toDataURL("image/png");
      }

      await nextTick();       
      setTimeout(() => {
        window.print();
        //window.onafterprint = () => window.close();
      }, 100);               

    } catch (err) {
      console.error("Invalid data:", err);
    }
  }
});
</script>

<style scoped>
body {
  font-family: 'CeraPro', 'Roboto', 'Arial', sans-serif; 
  font-weight: 700; 
}

table, td {
  border: 2px solid black;
  vertical-align: middle;
}
/* tr {
    display: table-row;
    vertical-align: inherit;
    unicode-bidi: isolate;
    border-color: inherit;
} */
</style>
