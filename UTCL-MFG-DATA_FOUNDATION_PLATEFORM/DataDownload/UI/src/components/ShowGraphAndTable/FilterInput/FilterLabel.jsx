export const FilterLabel = ({ filtername, mandatory }) => {
  return (
    <label className="mb-2 text-sm font-medium text-[var(--text-color)] font-sans">
      {filtername}
      {mandatory && <span className="text-danger ">*</span>}
    </label>
  );
};
