<template>
  <div class="font-[CeraPro] text-[14px] p-2">
    <table class="w-full border border-black border-collapse text-[11px]">
      <tbody>
        <tr>
          <td colspan="2" class="text-center py-2">
            <img
              src="/logos/Woolen.png"
              alt="logo"
              class="mx-auto w-[60px]"
            />
            <div class="text-[20px] font-semibold mt-1 text-gray-800">
              WOOLENTEX
            </div>
          </td>
        </tr>

        <tr v-for="(item, index) in infoList" :key="index">
          <td class="border border-black px-2 py-[2px]">{{ item.label }}</td>
          <td class="border border-black px-2 py-[2px]">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center mt-2">
      <img
        :src="barcodeImage"
        alt="barcode"
        class="max-w-full mt-1"
      />
    </div>

    <div class="text-center mt-[2px] text-[12px] font-bold">
      {{ barcodeNumber }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const infoList = ref([]);
const barcodeImage = ref("");
const barcodeNumber = ref("");

onMounted(() => {
  const query = new URLSearchParams(window.location.search);
  const data = query.get("data");

  if (data) {
    try {
      const order = JSON.parse(decodeURIComponent(data));

      infoList.value = [
        { label: "Order number:", value: order.order_number || "" },
        { label: "Article name:", value: order.article_name || "" },
        { label: "Article number:", value: order.article_number || "" },
        { label: "Colour:", value: order.colour || "" },
        { label: "Batch №:", value: order.batch || "" },
        { label: "Number of piece:", value: order.number_of_piece || "" },
        { label: "Width:", value: order.width || "" },
        { label: "Gross meters:", value: order.gross_meters || "" },
        { label: "Net meters:", value: order.net_meters || "" },
        { label: "Gross weight:", value: order.gross_weight || "" },
        { label: "Finish:", value: order.finish || "" },
        { label: "Sort:", value: order.sort || "" },
        { label: "Composition:", value: order.composition || "" },
        { label: "Machine ID:", value: order.machine_id || "" },
        { label: "Worker ID:", value: order.worker_id || "" },
      ];

      barcodeImage.value = order.barcode_image || "";
      barcodeNumber.value = order.barcode_number || "";
    } catch (err) {
      console.error("Invalid data:", err);
    }
  }

  window.print();
  //window.onafterprint = () => window.close();
});
</script>

<style scoped>
@font-face {
  font-family: 'CeraPro';
  src: url('/fonts/CeraPro-Regular.woff2') format('woff2'),
       url('/fonts/CeraPro-Regular.woff') format('woff'),
       url('/fonts/CeraPro-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

table, td {
  border: 2px solid black;
}
tr {
    display: table-row;
    vertical-align: inherit;
    unicode-bidi: isolate;
    border-color: inherit;
}
</style>
