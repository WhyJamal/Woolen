export function useRefund() {
    const userStore = useUserStore();
  
    const toogleRefund = async (model, tasks, showModel, pressed, isSubmitting, endclickSound) => {
      if (!model.value || !model.value[0]) {
        return;
      }
  
      try {
        const payloadRefund = {
          stage: model.value[0].stage?.code ?? null,
          productionplan: model.value[0].productionplan,
          date_productionplan: model.value[0].date_productionplan,
          nomenclature: model.value[0].nomenclature?.article ?? null,
          size: model.value[0].size,
          quantity: model.value[0].quantity,
          party: model.value[0].party,
          equipment: model.value[0].equipment,
          comment: "Возврат",
          owner: userStore.user.name,
        };
  
        await api.post("/v1/refund", payloadRefund);
  
        const idx = tasks.value.findIndex(
          (t) => t.productionplan === model.value[0].productionplan
        );
        if (idx !== -1) {
          tasks.value.splice(idx, 1);
          showModel.value = false;
        }
        pressed.value = false;
      } catch (error) {
        console.error("Refund error:", error);
      } finally {
        isSubmitting.value = false;
      }
      endclickSound.play();
    };
  
    return { toogleRefund };
  }
  