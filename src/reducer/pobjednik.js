const pobjednikReducer = (
  state: ReturnType<typeof setPobjedik>["payload"] = null,
  action: ReturnType<typeof setPobjedik>
) => {
  switch (action.type) {
    case "SET_POBJEDNIK":
      return action.payload;
    default:
      return state;
  }
};
export default pobjednikReducer;

export const setPobjedik = (pobjednik: string | null) => {
  return {
    type: "SET_POBJEDNIK",
    payload: pobjednik,
  };
};
