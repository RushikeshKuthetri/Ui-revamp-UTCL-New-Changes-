export function Alert({ errMsg }) {
  return (
    // <div className="alert alert-danger mt-1" role="alert">
    //   {errMsg}
    // </div>
    <div>
    <p className="mt-5 flex flex-rowitems-center gap-3 justify-center text-center rounded-xl transition-all duration-300 animate-fadeIn">
      <div class="text-xl mb-4 zoom-animation">🔍</div>
      {/* <!-- Title --> */}
      <h2 class="text-lg font-semibold text-[var(--leftdrawer-text)] mb-2">
              {errMsg}
      </h2>
    </p>
  </div>
  );
}
