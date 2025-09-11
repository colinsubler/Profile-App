const Filters = ({
    titles,
    selectedValue,
    onDescriptionChange,
    searchValue,
    onSearchChange,
    onClear
}) => {
    return (
        <div className="filter-container" style={{ display: 'flex', alignItems: 'flex-end', gap: '32px' }}>
            <div className="select-filter" style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="select" style={{ marginBottom: '6px' }}>Filter by Job Title:</label>
                <select id="select" onChange={onDescriptionChange} value={selectedValue}>
                    <option value="all">All</option>
                    {titles.map((title, idx) => (
                        <option key={idx} value={title}>{title}</option>
                    ))}
                </select>
            </div>
            <div className="search-filter" style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="searchName" style={{ marginBottom: '6px' }}>Search by Name:</label>
                <input
                    id="searchName"
                    type="text"
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder="Enter name"
                    style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            <button
                type="button"
                onClick={onClear}
                style={{
                    height: '36px',
                    alignSelf: 'flex-end',
                    marginLeft: '8px',
                    padding: '0 16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    cursor: 'pointer'
                }}
            >
                Clear
            </button>
        </div>
    );
};

export default Filters;