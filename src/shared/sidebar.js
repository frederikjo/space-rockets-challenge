import React, { useState, useReducer } from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	useDisclosure,
	IconButton,
	SimpleGrid
} from "@chakra-ui/core";
import { useLocalStorage } from "../hooks/hooks";
import { LaunchItem } from "../components/launches";

export default function Sidebar(launch) {
	return (
		<DrawerFunction launch={launch} />
	);
}


function DrawerFunction({ launch }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const [favoriteList, updateFavoriteList] = useState([]);
	// const [input, setInput] = useState(0);

	const [myArray, dispatch] = useReducer((myArray, { type, value }) => {
		switch (type) {
			case "add":
				return [...myArray, value];
			case "remove":
				return myArray.filter((_, index) => index !== value);
			default:
				return myArray;
		}
	}, [launch]);



	const newOpen = () => {
		updateFavoriteList(launch);
		onOpen();
	}

	return (
		<>
			<IconButton icon="star" variantColor="yellow" ref={btnRef} onClick={newOpen} />
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Create your account</DrawerHeader>
					<DrawerBody>
						{/* <SimpleGrid>
							<IconButton icon="star" variantColor="yellow" ref={btnRef} onClick={handleRemoveItem} />
							<LaunchItem launch={list.launch} key={list.flight_number}></LaunchItem>
						</SimpleGrid> */}
						<div>
							<input value={favoriteList} onInput={e => dispatch(e.target.value)} />
							<button onClick={() => dispatch({ type: "add", value: favoriteList })}>
								Add
      						</button>
							{favoriteList.map((item, index) => (
								<div>
									<h2>
										{item}
										<button onClick={() => dispatch({ type: "remove", value: index })}>
											Remove
            							</button>
									</h2>
								</div>
							))}
						</div>
						{/* {favoriteList.map(f => {
							return <span>{f.mission_name}</span>
						})} */}
					</DrawerBody>
					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
						<Button color="blue">Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
