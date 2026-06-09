type kunciPkButtonProps = {
    onClick: () => void;
}

export function KunciPkButton({ onClick }: kunciPkButtonProps) {

    return (
        <button
            className="button px-4 py-2 rounded border border-black bg-yellow-300 hover:bg-yellow-600 text-black"
            onClick={onClick}
        >
            Kunci PK
        </button>
    );
}
