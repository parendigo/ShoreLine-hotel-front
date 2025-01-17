import React, {useState} from 'react';

const RoomFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) =>
            room.roomType.toLowerCase()
                .includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredRooms);
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="toom-type-filter">
                Filter rooms by type
            </span>
            <select
                className="form-select"
                value={filter}
                onChange={handleSelectChange}>
                {roomTypes.map((roomType, index) => (
                    index === 0 ? (
                        <option key={index} value={roomType}>All types</option>
                    ) : (
                        <option key={index} value={roomType}>
                            {roomType}
                        </option>
                    )
                ))}
            </select>
            <button className="btn btn-hotel" type="button" onClick={clearFilter}>
                Clear Filter
            </button>
        </div>
    );
};

export default RoomFilter;