import {useRef, useEffect} from 'react';
import { ModalContainer } from './styled';

const ModalMenu = ({children, isOpen, closeModal}) => {

    useEffect(() => {
    }, [])

    const modalRef = useRef(null);


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
        <ModalContainer isOpen={isOpen}>
            <div ref={modalRef} className={`modal-container ${isOpen ? 'open' : ''}`}>
                <button onClick={closeModal}>x</button>
                {children}
            </div>
        </ModalContainer>
    )
    
}

export default ModalMenu