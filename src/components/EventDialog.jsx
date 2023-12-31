import { useEffect, forwardRef, useState, Fragment } from "react"

import { useSelector, useDispatch } from "react-redux"
import { closeDialog } from "../actions/dialogActions"
import { openDrawerWithData } from "../actions/drawerActions"
import { updateCalendar } from "../actions/calendarActions"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import ListItemText from "@mui/material/ListItemText"
import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import { getEventsByDay, deleteEvent } from "../services/eventServices"
import sortEventsByTime from "../helper/sortEventsByTime"
import nthDay from "../helper/nthDay"

import { monthsOfYear } from "../helper/constants"
import WeatherInfo from "./WeatherInfo"

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const EventDialog = () => {
	const [eventList, setEventList] = useState([])
	const { dialogIsOpen, eventDate } = useSelector((state) => state.dialog)
	const dispatch = useDispatch()

	useEffect(() => {
		if (eventDate) {
			const eventsObj = getEventsByDay({
				day: eventDate.number,
				month: eventDate.month,
				year: eventDate.year,
			})

			setEventList(sortEventsByTime(Object.values(eventsObj)))
		}
	}, [dialogIsOpen, eventDate])

	const dispatchEditEvent = (eventData) => {
		dispatch(closeDialog())
		dispatch(openDrawerWithData(eventData))
	}

	const dispatchDeleteEvent = (eventData) => {
		deleteEvent(eventData)
		dispatch(closeDialog())
		dispatch(updateCalendar(eventData))
	}

	return (
		<Dialog
			open={dialogIsOpen ? true : false}
			TransitionComponent={Transition}
			keepMounted
			fullScreen
			onClose={() => dispatch(closeDialog())}
			aria-describedby="alert-dialog-slide-description"
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => dispatch(closeDialog())}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					{eventDate && (
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							{monthsOfYear[eventDate.month]} {eventDate.number}
							{nthDay(eventDate.number)}
						</Typography>
					)}
					<Button autoFocus color="inherit" onClick={() => dispatch(closeDialog())}>
						Go Back
					</Button>
				</Toolbar>
			</AppBar>
			<List>
				{eventList &&
					eventList.map((event, eventIndex) => (
						<Fragment
							key={`list-tem-events-dialog-${eventIndex}-date-${event.date.day}`}
						>
							<ListItem
								secondaryAction={
									<>
										<IconButton
											edge="end"
											aria-label="edit"
											sx={{ mr: 3 }}
											onClick={() => dispatchEditEvent(event)}
										>
											<EditIcon />
										</IconButton>
										<IconButton
											edge="end"
											aria-label="delete"
											sx={{ mr: 3 }}
											onClick={() => dispatchDeleteEvent(event)}
										>
											<DeleteIcon />
										</IconButton>
									</>
								}
								sx={{
									px: 5,
								}}
							>
								<ListItemText primary={event.city} secondary={event.description} />
							</ListItem>
							<WeatherInfo city={event.city} date={event.date} />
							<Divider sx={{ mt: 2 }} />
						</Fragment>
					))}
			</List>
		</Dialog>
	)
}

export default EventDialog
