import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import DataTable from '../components/ui/DataTable';
import Drawer from '../components/ui/Drawer';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { getPolicies, createPolicy, updatePolicy, deletePolicy } from '../services/policyService';
import { formatDate } from '../utils/formatters';

const NHOM_OPTIONS = ['Tài chính', 'Nội quy', 'Hợp đồng', 'An ninh', 'Vệ sinh', 'Khác'];
const UU_TIEN_OPTIONS = [
  { value: 'HIGH', label: 'Cao' },
  { value: 'MEDIUM', label: 'Trung bình' },
  { value: 'LOW', label: 'Thấp' },
];

const defaultForm = {
  TieuDe: '',
  NhomQuyDinh: 'Nội quy',
  NoiDung: '',
  NgayHieuLuc: '',
  NgayHetHieuLuc: '',
  TrangThai: 'ACTIVE',
  UuTien: 'MEDIUM',
  ApDungCho: '',
};

export default function PolicyManagement() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', trangThai: 'ALL', nhomQuyDinh: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const loadPolicies = async () => {
    setLoading(true);
    try {
      const params = filters.trangThai === 'ALL' ? {} : { trangThai: filters.trangThai };
      const res = await getPolicies(params);
      const list = res?.data?.policies || [];
      setPolicies(list);
    } catch (err) {
      toast.error('Không thể tải quy định');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolicies();
  }, [filters.trangThai]);

  const openCreate = () => {
    setEditItem(null);
    setForm(defaultForm);
    setDrawerOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ ...item });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditItem(null);
  };

  const handleSave = async () => {
    if (!form.TieuDe || !form.NgayHieuLuc) {
      toast.error('Vui lòng điền Tiêu đề và Ngày hiệu lực');
      return;
    }
    setSubmitting(true);
    try {
      if (editItem) {
        await updatePolicy(editItem.MaQuyDinh, form);
        toast.success('Cập nhật quy định thành công');
      } else {
        await createPolicy(form);
        toast.success('Tạo quy định thành công');
      }
      closeDrawer();
      loadPolicies();
    } catch (err) {
      toast.error(err?.message || 'Lưu thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deletePolicy(deleteTarget.MaQuyDinh);
      toast.success('Đã xóa quy định');
      setDeleteTarget(null);
      loadPolicies();
    } catch (err) {
      toast.error(err?.message || 'Xóa thất bại');
    }
  };

  const statusVariant = (s) => {
    if (s === 'ACTIVE') return 'available';
    if (s === 'UPCOMING') return 'warning';
    return 'secondary';
  };
  const statusLabel = (s) => {
    if (s === 'ACTIVE') return 'Đang áp dụng';
    if (s === 'UPCOMING') return 'Sắp áp dụng';
    return 'Hết hiệu lực';
  };

  const displayed = policies.filter(p => {
    const matchSearch = !filters.search || (p.TieuDe && p.TieuDe.toLowerCase().includes(filters.search.toLowerCase()));
    const matchNhom = !filters.nhomQuyDinh || p.NhomQuyDinh === filters.nhomQuyDinh;
    return matchSearch && matchNhom;
  });

  const columns = [
    {
      key: 'MaQuyDinh',
      title: 'Mã',
      width: 100,
      render: (value, row) => value || '—',
    },
    {
      key: 'TieuDe',
      title: 'Tiêu đề',
      render: (value, row) => <strong>{value || '—'}</strong>,
    },
    {
      key: 'NhomQuyDinh',
      title: 'Nhóm',
      render: (value, row) => <span className="badge badge-info">{value || '—'}</span>,
    },
    {
      key: 'NoiDung',
      title: 'Nội dung tóm tắt',
      render: (value, row) => <span style={{ color: '#6C757D', fontSize: 13 }}>{(value || '').substring(0, 80)}...</span>,
    },
    {
      key: 'NgayHieuLuc',
      title: 'Ngày hiệu lực',
      render: (value, row) => formatDate(value),
    },
    {
      key: 'TrangThai',
      title: 'Trạng thái',
      render: (value, row) => <Badge variant={statusVariant(value)}>{statusLabel(value)}</Badge>,
    },
    {
      key: 'actions',
      title: 'Thao tác',
      width: 100,
      render: (value, row) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => openEdit(row)}
            style={{
              background: 'none',
              border: '1px solid #0A58CA',
              color: '#0A58CA',
              borderRadius: 6,
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            <FiEdit2 size={13} />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            style={{
              background: 'none',
              border: '1px solid #DC3545',
              color: '#DC3545',
              borderRadius: 6,
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Quy định" />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Quản lý quy định</h1>
            <Button variant="primary" onClick={openCreate}>
              <FiPlus size={16} style={{ marginRight: 6 }} /> Thêm quy định mới
            </Button>
          </div>

          {/* Filter bar */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 2, minWidth: 200 }}>
                <label className="form-label">Tìm kiếm</label>
                <input
                  className="form-control"
                  placeholder="Tìm theo tiêu đề..."
                  value={filters.search}
                  onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                />
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: 140 }}>
                <label className="form-label">Nhóm</label>
                <select
                  className="form-control"
                  value={filters.nhomQuyDinh}
                  onChange={(e) => setFilters((f) => ({ ...f, nhomQuyDinh: e.target.value }))}
                >
                  <option value="">Tất cả</option>
                  {NHOM_OPTIONS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: 140 }}>
                <label className="form-label">Trạng thái</label>
                <select
                  className="form-control"
                  value={filters.trangThai}
                  onChange={(e) => setFilters((f) => ({ ...f, trangThai: e.target.value }))}
                >
                  <option value="ALL">Tất cả</option>
                  <option value="ACTIVE">Đang áp dụng</option>
                  <option value="UPCOMING">Sắp áp dụng</option>
                  <option value="EXPIRED">Hết hiệu lực</option>
                </select>
              </div>
              <Button variant="outline" onClick={() => setFilters({ search: '', trangThai: 'ALL', nhomQuyDinh: '' })}>
                Reset
              </Button>
            </div>
          </div>

          {/* Data table */}
          <div className="card">
            <DataTable columns={columns} data={displayed} loading={loading} emptyText="Không có quy định nào" />
          </div>

          {/* Drawer */}
          <Drawer
            isOpen={drawerOpen}
            onClose={closeDrawer}
            width="500px"
            title={editItem ? 'Chỉnh sửa quy định' : 'Thêm quy định mới'}
            footer={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="outline" onClick={closeDrawer}>Hủy</Button>
                <Button variant="primary" loading={submitting} onClick={handleSave}>Lưu quy định</Button>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Tiêu đề *</label>
                <input className="form-control" value={form.TieuDe} onChange={(e) => setForm((f) => ({ ...f, TieuDe: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Nhóm quy định</label>
                  <select className="form-control" value={form.NhomQuyDinh} onChange={(e) => setForm((f) => ({ ...f, NhomQuyDinh: e.target.value }))}>
                    {NHOM_OPTIONS.map((n) => (<option key={n} value={n}>{n}</option>))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ưu tiên</label>
                  <select className="form-control" value={form.UuTien} onChange={(e) => setForm((f) => ({ ...f, UuTien: e.target.value }))}>
                    {UU_TIEN_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Nội dung chi tiết</label>
                <textarea className="form-control" rows={6} value={form.NoiDung} onChange={(e) => setForm((f) => ({ ...f, NoiDung: e.target.value }))} placeholder="Nhập nội dung quy định..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Ngày hiệu lực *</label>
                  <input type="date" className="form-control" value={form.NgayHieuLuc} onChange={(e) => setForm((f) => ({ ...f, NgayHieuLuc: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày hết hiệu lực</label>
                  <input type="date" className="form-control" value={form.NgayHetHieuLuc || ''} onChange={(e) => setForm((f) => ({ ...f, NgayHetHieuLuc: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Trạng thái</label>
                <select className="form-control" value={form.TrangThai} onChange={(e) => setForm((f) => ({ ...f, TrangThai: e.target.value }))}>
                  <option value="ACTIVE">Đang áp dụng</option>
                  <option value="UPCOMING">Sắp áp dụng</option>
                  <option value="EXPIRED">Hết hiệu lực</option>
                </select>
              </div>
            </div>
          </Drawer>

          {/* Delete Modal */}
          <Modal
            isOpen={!!deleteTarget}
            onClose={() => setDeleteTarget(null)}
            title="Xác nhận xóa quy định"
            size="sm"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={() => setDeleteTarget(null)}>Hủy</Button>
                <Button variant="danger" onClick={handleDelete}>Xóa</Button>
              </div>
            }
          >
            <p>Bạn có chắc muốn xóa quy định <strong>"{deleteTarget?.TieuDe}"</strong>?</p>
          </Modal>
        </main>
      </div>
    </div>
  );
}