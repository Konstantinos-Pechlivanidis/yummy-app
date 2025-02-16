import React, { useState, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";
import "./TableManagement.css";

const API_URL = "/api/layout"; // API Endpoint for Saving/Loading Data

const DEFAULT_LAYOUT = [
  {
    id: "item-1",
    type: "table",
    x: 494.0000305175781,
    y: 122.79995727539062,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-2",
    type: "table",
    x: 101.39999389648438,
    y: 250.60000610351562,
    width: 130,
    height: 83,
    color: "#2ecc71",
    seats: 7,
    reserved: false,
  },
  {
    id: "item-3",
    type: "table",
    x: 602.0000610351562,
    y: 176.4000244140625,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-4",
    type: "table",
    x: 394.7999572753906,
    y: 222,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-5",
    type: "bar",
    x: 110.800048828125,
    y: 37.399993896484375,
    width: 268,
    height: 50,
    color: "#283747",
    seats: null,
    reserved: false,
  },
  {
    id: "item-6",
    type: "kitchen",
    x: 446.8000183105469,
    y: 17.600006103515625,
    width: 270,
    height: 91,
    color: "#283747",
    seats: null,
    reserved: false,
  },
  {
    id: "item-7",
    type: "door",
    x: 42.800018310546875,
    y: 142,
    width: 70,
    height: 70,
    color: "#283747",
    seats: null,
    reserved: false,
  },
  {
    id: "item-8",
    type: "table",
    x: 278.800048828125,
    y: 222.79998779296875,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-9",
    type: "table",
    x: 385.2000427246094,
    y: 122,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-10",
    type: "table",
    x: 276.3999328613281,
    y: 118,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-11",
    type: "table",
    x: 165.19998168945312,
    y: 114.79998779296875,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-12",
    type: "table",
    x: 518,
    y: 216.4000244140625,
    width: 60,
    height: 60,
    color: "#2ecc71",
    seats: 4,
    reserved: false,
  },
  {
    id: "item-13",
    type: "wall",
    x: 306,
    y: 316,
    width: 363,
    height: 24,
    color: "#283747",
    seats: null,
    reserved: false,
  },
];

const TableManagement = ({ isOwner }) => {
  const [items, setItems] = useState([]);
  const [activeMode, setActiveMode] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [editingSeats, setEditingSeats] = useState(null); // ✅ Ensure editingSeats is defined
  const [seatValue, setSeatValue] = useState(4); // Default seat number
  const [reservationSize, setReservationSize] = useState(1);

  useEffect(() => {
    // fetchLayout();

    // Testing purpose
    setItems(DEFAULT_LAYOUT);
  }, []);

  // const fetchLayout = async () => {
  //   try {
  //     const response = await fetch(API_URL);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setItems(data.layout || []);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching layout:", error);
  //   }
  // };

  const saveLayout = async () => {
    try {
      console.log(items);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout: items }),
      });
      if (response.ok) {
        console.log("Layout saved successfully!");
      } else {
        console.error("Failed to save layout.");
      }
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };

  const isResizing = activeMode === "resize";
  const isArranging = activeMode === "arrange";
  const isManagingReservations = activeMode === "reservations";
  const isDeleting = activeMode === "delete";
  const isEditingSeats = activeMode === "edit-seats";

  const addElement = (type) => {
    const elementDefaults = {
      table: { width: 60, height: 60, color: "#239b56", seats: 4 },
      bar: { width: 80, height: 50, color: "#283747" },
      kitchen: { width: 100, height: 80, color: "#283747" },
      door: { width: 70, height: 70, color: "#283747" },
      wc: { width: 50, height: 50, color: "#283747" },
      wall: { width: 20, height: 200, color: "#283747" },
    };

    setItems([
      ...items,
      {
        id: `item-${items.length + 1}`,
        type,
        x: 50,
        y: 50,
        width: elementDefaults[type].width,
        height: elementDefaults[type].height,
        color: elementDefaults[type].color,
        seats: elementDefaults[type].seats || null,
        reserved: false,
      },
    ]);
  };

  const handleDragEnd = (event) => {
    if (!isArranging) return;
    const { id } = event.active;
    const { delta } = event;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, x: item.x + delta.x, y: item.y + delta.y }
          : item
      )
    );
  };

  const handleResize = (id, size) => {
    if (!isResizing) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, width: size.width, height: size.height }
          : item
      )
    );
  };

  const toggleReserveTable = (id) => {
    if (!isManagingReservations) return;
    setActivePopup(id);
  };

  const confirmReservation = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.type === "table"
          ? { ...item, reserved: !item.reserved, color: "#c12c2c" }
          : item
      )
    );
    setActivePopup(null);
  };

  const confirmDelete = (id) => {
    setActivePopup(id);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setActivePopup(null);
  };

  const openSeatEditor = (id, currentSeats) => {
    setEditingSeats(id);
    setSeatValue(currentSeats);
  };

  const updateSeats = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.type === "table"
          ? { ...item, seats: seatValue }
          : item
      )
    );
    setEditingSeats(null);
  };

  return (
    <div className="table-management-container">
      <h2 className="table-management-title">Find the Perfect Spot</h2>

      {!isOwner && (
        <div className="reservation-input">
          <label>How Many Guests?</label>
          <input
            type="number"
            min="1"
            max="20"
            value={reservationSize}
            onChange={(e) => setReservationSize(parseInt(e.target.value, 10))}
          />
        </div>
      )}

      {isOwner && (
        <div className="table-management-toolbox">
          {["table", "bar", "kitchen", "door", "wc", "wall"].map((type) => (
            <button
              key={type}
              className="toolbox-button"
              onClick={() => addElement(type)}
            >
              Add {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}

      {isOwner && (
        <div className="table-management-edit-controls">
          <button
            className={`edit-button ${isResizing ? "active" : ""}`}
            onClick={() => setActiveMode(isResizing ? null : "resize")}
          >
            Resize Items
          </button>
          <button
            className={`edit-button ${isArranging ? "active" : ""}`}
            onClick={() => setActiveMode(isArranging ? null : "arrange")}
          >
            Arrange Tables
          </button>
          <button
            className={`edit-button ${isManagingReservations ? "active" : ""}`}
            onClick={() =>
              setActiveMode(isManagingReservations ? null : "reservations")
            }
          >
            Manage Reservations
          </button>
          <button
            className={`edit-button ${isEditingSeats ? "active" : ""}`}
            onClick={() => setActiveMode(isEditingSeats ? null : "edit-seats")}
          >
            Edit Seats
          </button>
          <button
            className={`edit-button ${isDeleting ? "active" : ""}`}
            onClick={() => setActiveMode(isDeleting ? null : "delete")}
          >
            Remove Items
          </button>
        </div>
      )}

      <DndContext onDragEnd={isArranging ? handleDragEnd : null}>
        <div className="table-management-panel">
          {items.map((item) => {
            const isUnavailable =
              !isOwner && item.type === "table" && item.seats < reservationSize;
            return (
              <DraggableItem
                key={item.id}
                item={item}
                isEditingLayout={isArranging}
                isEditingReservations={isManagingReservations}
                isDeleting={isDeleting}
                isEditingSeats={isEditingSeats}
                isResizing={isResizing}
                toggleReserveTable={toggleReserveTable}
                confirmDelete={confirmDelete}
                activePopup={activePopup}
                confirmReservation={confirmReservation}
                deleteItem={deleteItem}
                openSeatEditor={openSeatEditor}
                editingSeats={editingSeats}
                seatValue={seatValue}
                setSeatValue={setSeatValue}
                updateSeats={updateSeats}
                setEditingSeats={setEditingSeats}
                setActivePopup={setActivePopup}
                handleResize={handleResize}
                isUnavailable={isUnavailable}
              />
            );
          })}
        </div>
      </DndContext>

      {isOwner && (
        <button className="save-button" onClick={saveLayout}>
          Save Layout
        </button>
      )}
    </div>
  );
};

const DraggableItem = ({
  item,
  isEditingLayout,
  isEditingReservations,
  isDeleting,
  isEditingSeats,
  isResizing,
  toggleReserveTable,
  confirmDelete,
  activePopup,
  confirmReservation,
  deleteItem,
  openSeatEditor,
  editingSeats,
  seatValue,
  setSeatValue,
  updateSeats,
  handleResize,
  setEditingSeats, // Ensure correct state update
  setActivePopup,
  isUnavailable,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: item.id });

  return (
    <Resizable
      size={{ width: item.width, height: item.height }}
      onResizeStop={(e, direction, ref, d) =>
        handleResize(item.id, {
          width: item.width + d.width,
          height: item.height + d.height,
        })
      }
      className={`table-management-item ${item.reserved ? "reserved" : ""} ${
        !isEditingLayout && (isUnavailable ? "unavailable" : "")
      }`}
      style={{
        top: item.y,
        left: item.x,
        backgroundColor: isUnavailable ? "#7d7d7d" : item.color,
        position: "absolute",
        cursor: isUnavailable
          ? "not-allowed"
          : isEditingLayout
          ? "grab"
          : "pointer",
        opacity: isUnavailable ? "0.6" : "1",
        pointerEvents: isUnavailable ? "none" : "auto",
      }}
    >
      <div
        ref={setNodeRef}
        {...(isEditingLayout ? { ...listeners, ...attributes } : {})}
        onClick={() => {
          if (isEditingReservations) toggleReserveTable(item.id);
          if (isDeleting) confirmDelete(item.id);
          if (isEditingSeats && item.type === "table")
            openSeatEditor(item.id, item.seats);
        }}
      >
        {item.type === "wall" ? "w" : item.type.toUpperCase()}{" "}
        {item.type === "table" ? `(${item.seats})` : ""}
      </div>

      {/* Reservation Popup */}
      {activePopup === item.id && isEditingReservations && (
        <div className="popup">
          <p>
            {item.reserved && item.type === "table"
              ? "Unbook this table?"
              : "Book this table?"}
          </p>
          <div className="popup-button-container">
            <button
              className="manage-reservations-btn"
              onClick={() => confirmReservation(item.id)}
            >
              Yes
            </button>
            <button
              className="cancel-button"
              onClick={() => setActivePopup(null)}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {activePopup === item.id && isDeleting && (
        <div className="popup">
          <p>Delete this item?</p>
          <div className="popup-button-container">
            <button
              className="remove-item-btn"
              onClick={() => deleteItem(item.id)}
            >
              Yes
            </button>
            <button
              className="cancel-button"
              onClick={() => setActivePopup(null)}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Seat Editing Popup */}
      {editingSeats === item.id && isEditingSeats && item.type === "table" && (
        <div className="popup">
          <p>Edit Seats:</p>
          <input
            id="edit_seats"
            type="number"
            value={seatValue}
            min="1"
            max="20"
            onChange={(e) => setSeatValue(parseInt(e.target.value, 10))}
          />
          <div className="popup-button-container">
            <button
              className="edit-seats-btn"
              onClick={() => updateSeats(item.id)}
            >
              Update
            </button>
            <button
              className="cancel-button"
              onClick={() => setEditingSeats(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Resizable>
  );
};

export default TableManagement;
