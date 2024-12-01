"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lb/actions";
import { useTransition } from "react";
import Spinner from "./Spinner";
import SpinnerMini from "./SpinnerMini";

type deleteReservationProps = {
  bookingId: string;
  // onDelete: (bookingId: string) => Promise<void>;
  onDelete: any;
};
function DeleteReservation({ bookingId, onDelete }: deleteReservationProps) {
  const [isPending, startTransition] = useTransition();
  // function handleDelete() {
  //   if (confirm("Are you sure you want to delete thi reservation?")) {
  //     startTransition(() => deleteReservation(bookingId));
  //   }
  // }
  return (
    <button
      onClick={() => onDelete(bookingId)}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
