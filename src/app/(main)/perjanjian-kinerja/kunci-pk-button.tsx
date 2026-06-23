import { TbLock, TbLockOpen } from "react-icons/tb";

type kunciPkButtonProps = {
    onClick: () => void;
}

export function KunciPkButton({ onClick }: kunciPkButtonProps) {

    return (
        <button
            className="w-full flex flex-col items-center gap-1 button px-4 py-2 rounded border border-black bg-yellow-300 hover:bg-yellow-600 text-black"
            onClick={onClick}
        >
            <TbLock />
            Kunci PK
        </button>
    );
}

export function BukaKunciPkButton({ onClick }: kunciPkButtonProps) {

    return (
        <button
            className="w-full flex flex-col items-center gap-1 button px-4 py-2 rounded border border-black bg-blue-300 hover:bg-blue-600 text-black"
            onClick={onClick}
        >
            <TbLockOpen />
            Buka Kunci
        </button>
    );
}
