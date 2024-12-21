import React from 'react';
import { acnhColors } from '../../styles/colors';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: acnhColors.overlay }}
        onClick={onClose}
      />

      {/* モーダルコンテンツ */}
      <div
        className="relative w-11/12 max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ backgroundColor: acnhColors.beige }}
      >
        {/* ヘッダー */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: acnhColors.brown }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ color: acnhColors.brown }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: acnhColors.primary }}
          >
            <span className="text-white">&times;</span>
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
