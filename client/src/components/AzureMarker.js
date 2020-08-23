import React, { memo, useMemo, useState } from "react";
import {
	AzureMap,
	AzureMapDataSourceProvider,
	AzureMapFeature,
	AzureMapHtmlMarker,
	AzureMapLayerProvider,
	AzureMapsProvider,
} from "react-azure-maps";
import { AuthenticationType, data } from "azure-maps-control";
import { Button, Chip } from "@material-ui/core";
// import { key } from "../../key";
const point1 = new data.Position(-100.01, 45.01);
const point2 = new data.Position(-120.2, 45.1);
const point3 = new data.Position(-120.2, 50.1);
const point4 = new data.Position(-126.2, 55.1);
function clusterClicked(e) {
	console.log("clusterClicked", e);
}
const onClick = (e) => {
	console.log("You click on: ", e);
};
function azureHtmlMapMarkerOptions(coordinates) {
	return {
		position: coordinates,
		text: "My text",
		title: "Title",
	};
}
const memoizedOptions = {
	textOptions: {
		textField: ["get", "title"],
		offset: [0, 1.2],
	},
};
const eventToMarker = [{ eventName: "click", callback: onClick }];
const renderPoint = (coordinates) => {
	const rendId = Math.random();
	return React.createElement(AzureMapFeature, {
		key: rendId,
		id: rendId.toString(),
		type: "Point",
		coordinate: coordinates,
		properties: {
			title: "Pin",
			icon: "pin-round-blue",
		},
	});
};
function renderHTMLPoint(coordinates) {
	const rendId = Math.random();
	return React.createElement(AzureMapHtmlMarker, {
		key: rendId,
		markerContent: React.createElement("div", { className: "pulseIcon" }),
		options: Object.assign({}, azureHtmlMapMarkerOptions(coordinates)),
		events: eventToMarker,
	});
}
const colorValue = () =>
	"#000000".replace(/0/g, function () {
		return (~~(Math.random() * 16)).toString(16);
	});
const markersStandardImages = [
	`marker-black`,
	`marker-blue`,
	`marker-darkblue`,
	`marker-red`,
	`marker-yellow`,
	`pin-blue`,
	`pin-darkblue`,
	`pin-red`,
	`pin-round-blue`,
	`pin-round-darkblue`,
	`pin-round-red`,
];
const rand = () => {
	const randomImage2 =
		markersStandardImages[
			Math.floor(Math.random() * markersStandardImages.length)
		];
	return randomImage2;
};
const MarkersExample = () => {
	const [markers, setMarkers] = useState([point1, point2, point3]);
	const [htmlMarkers, setHtmlMarkers] = useState([point4]);
	const [markersLayer, setMarkersLayer] = useState("SymbolLayer");
	const [layerOptions, setLayerOptions] = useState(memoizedOptions);
	const option = useMemo(() => {
		return {
			authOptions: {
				authType: AuthenticationType.subscriptionKey,
				subscriptionKey: "KxZCtiOPTPXUg1qsqLr-jYzY0yXFQj2orHQ2lo47ZW8",
			},
			center: [-100.01, 45.01],
			zoom: 5,
			view: "Auto",
		};
	}, []);
	const addRandomMarker = () => {
		const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120);
		const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
		const newPoint = new data.Position(randomLongitude, randomLatitude);
		setMarkers([...markers, newPoint]);
	};
	const addRandomHTMLMarker = () => {
		const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120);
		const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
		const newPoint = new data.Position(randomLongitude, randomLatitude);
		setHtmlMarkers([...htmlMarkers, newPoint]);
	};
	const removeAllMarkers = () => {
		setMarkers([]);
		setHtmlMarkers([]);
	};
	const memoizedMarkerRender = useMemo(
		() => markers.map((marker) => renderPoint(marker)),
		[markers]
	);
	const memoizedHtmlMarkerRender = useMemo(
		() => htmlMarkers.map((marker) => renderHTMLPoint(marker)),
		[htmlMarkers]
	);
	console.log("MarkerExample RENDER");
	return React.createElement(
		React.Fragment,
		null,

		React.createElement(
			"div",
			{ style: styles.map },
			React.createElement(
				AzureMapsProvider,
				null,
				React.createElement(
					AzureMap,
					{ options: option },
					React.createElement(
						AzureMapDataSourceProvider,
						{
							events: {
								dataadded: (e) => {
									console.log("Data on source added", e);
								},
							},
							id: "markersExample AzureMapDataSourceProvider",
							options: { cluster: true, clusterRadius: 2 },
						},
						React.createElement(AzureMapLayerProvider, {
							id: "markersExample AzureMapLayerProvider",
							options: layerOptions,
							events: {
								click: clusterClicked,
								dbclick: clusterClicked,
							},
							lifecycleEvents: {
								layeradded: () => {
									console.log("LAYER ADDED TO MAP");
								},
							},
							type: markersLayer,
						}),
						memoizedMarkerRender,
						memoizedHtmlMarkerRender
					)
				)
			)
		)
	);
};
const styles = {
	map: {
		height: 300,
	},
	buttonContainer: {
		display: "grid",
		gridAutoFlow: "column",
		gridGap: "10px",
		gridAutoColumns: "max-content",
		padding: "10px 0",
		alignItems: "center",
	},
	button: {
		height: 35,
		width: 80,
		backgroundColor: "#68aba3",
		"text-align": "center",
	},
};
export default memo(MarkersExample);
