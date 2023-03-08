import React, { useState } from "react";

type ContextType = {
    items: any[],
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
    selectedItem: any;
}

export const ItemContextData = React.createContext<ContextType>({
    items: [],
    setItems: function (value: React.SetStateAction<any[]>): void {
        throw new Error("Function not implemented.");
    },
    setSelectedItem: function (value: any): void {
        throw new Error("Function not implemented.");
    },
    selectedItem: undefined
});

const ItemContext = ({children}: any) => {
    const [items, setItems] = useState([] as any[]);
    const [selectedItem, setSelectedItem] = useState(undefined);

    return <ItemContextData.Provider value={{items, setItems, setSelectedItem, selectedItem }} >
        {children}
    </ItemContextData.Provider>
}

export default ItemContext;