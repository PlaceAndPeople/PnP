'use client';

import FilterButton from '@/components/common/Button/FilterButton';
import FilterModal from '@/components/common/Modal/FilterModal';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';

export default function Filter() {
  return (
    <>
      <div className="flex h-[78px] flex-row items-center justify-between">
        <p>필터 아이콘들 들어갈 자리</p>
        <FilterButton />
      </div>
      <ModalProvider modalId={MODAL_ID.ROOM_FILTER}>
        <FilterModal />
      </ModalProvider>
    </>
  );
}
