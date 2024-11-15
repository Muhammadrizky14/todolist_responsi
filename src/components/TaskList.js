import React, { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IoIosSearch } from "react-icons/io"; // Tambahkan import IoIosSearch

const TaskStatusIndicator = ({ status }) => {
    const getStatusClass = () => {
        switch (status) {
            case 'To Do':
                return 'status-todo';
            case 'In Progress':
                return 'status-in-progress';
            case 'Done':
                return 'status-done';
            default:
                return '';
        }
    };

    return (
        <div className={`task-status-indicator ${getStatusClass()}`}>
            {status === 'Done' && <span>&#10003;</span>}
        </div>
    );
};

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State untuk kata kunci pencarian
    const [statusFilter, setStatusFilter] = useState('Default'); // State untuk filter status

    const handleShowDeleteModal = (taskId) => {
        setTaskToDelete(taskId);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const handleDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete);
            handleCloseDeleteModal();
        }
    };

    const handleUpdate = () => {
        setShowSuccessModal(true);
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    // Filter tasks berdasarkan searchTerm dan status
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Default' || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Kontainer untuk pencarian dan filter */}
            <div className="search-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <IoIosSearch style={{ marginRight: '8px', color: '#888' }} size={20} /> {/* Ikon pencarian */}
                <input
                    type="text"
                    placeholder="Search Task"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    style={{ flex: 1, padding: '5px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {/* Dropdown untuk filter status */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px' }}
                >
                    <option value="Default">Default</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            {/* Daftar task */}
            {filteredTasks.map((task, index) => (
                <Card className="task-card" key={index}>
                    <Card.Body className="task-info">
                        <div>
                            <div className="task-label">Task</div>
                            <div className="task-name">{task.name}</div>
                        </div>
                        <div>
                            <div className="task-label">Priority</div>
                            <div className={`task-priority ${task.priority.toLowerCase()}`}>
                                {task.priority}
                            </div>
                        </div>
                        <div>
                            <div className="task-status">{task.status}</div>
                        </div>
                        <TaskStatusIndicator status={task.status} />
                        <div className="d-flex">
                            <button className="icon-btn" onClick={() => { showEditForm(task); handleUpdate(); }}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button className="icon-btn delete" onClick={() => handleShowDeleteModal(task.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            {/* Modal konfirmasi hapus */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda yakin ingin menghapus task ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal sukses untuk konfirmasi update */}
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Task berhasil diperbarui!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseSuccessModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskList;
