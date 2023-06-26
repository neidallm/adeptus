import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({onSearch}){
    const [searchTerm, setSearchTerm] = useState('');

    useEffect( () => {
        onSearch(searchTerm);
    }, [searchTerm, onSearch]);

    return (
        <Form.Control
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}