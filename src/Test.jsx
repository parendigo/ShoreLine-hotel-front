import React, {useEffect, useState} from "react";
import axios from "axios";

function Test(props) {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [optionList, setOptionList] = useState([]);
    const fetchData = () => {
        axios
            .get("http://localhost:9192/rooms/room/types")
            .then((response) => {
                const {data} = response;
                if (response.status === 200) {
                    setRoomTypes(data)
                } else {
                    console.error("Error fetching room types")
                }
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <select
            disabled={false}
            value={roomTypes}
            onChange={(e) => setRoomTypes(e.currentTarget.value)}
        >
            {roomTypes.map((value ) => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}

export default Test