
import React from "react";
import { Modal, Box, Heading, Button, FormControl, Input, VStack, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { AddItem } from "../AddItem";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/packsStore";


export const EditPackModal = ({ packData, packId }) => {


    const dispatch = useDispatch();

    const isModalOpen = useSelector((state) => state.packs.isOpenEditModal);




    return <>
        <Modal isOpen={isModalOpen} onClose={() => dispatch(closeModal())} avoidKeyboard justifyContent="center" top="4" size="lg">
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>
                    <Heading>{'Edit Item'}</Heading>
                </Modal.Header>
                <Modal.Body>
                    <AddItem _id={packId} isEdit={true} packData={packData} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onPress={() => dispatch(closeModal())} ml="auto">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </>;
}