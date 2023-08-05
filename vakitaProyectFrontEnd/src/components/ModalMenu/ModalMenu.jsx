import {useRef, useEffect} from 'react';

const ModalMenu = ({children, isOpen, closeModal, titleHandler}) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal()
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

    }, []);

    return (
        <article isOpen={isOpen}>
            <div ref={modalRef} className={`modal-container ${isOpen ? 'open' : ''}`}>
                <button onClick={closeModal}>x</button>
                {children}
            </div>
        </article>
    )
    
}

export default ModalMenu