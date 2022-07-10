import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { isValidString } from './utils/helper';
import { loadScript } from './utils/widget';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const TawkMessenger = forwardRef((props, ref) => {
	useEffect(() => {
		load();
	}, []);

	const load = () => {
		if (!isValidString(props.propertyId)) {
			console.error('[Tawk-messenger-react warn]: You didn\'t specified \'propertyId\' property in the plugin.');
			return;
		}
	
		if (!isValidString(props.widgetId)) {
			console.error('[Tawk-messenger-react warn]: You didn\'t specified \'widgetId\' property in the plugin.');
			return;
		}

		if (!window || !document) {
			return;
		}

		init();
	};

	const init = () => {
		window.Tawk_API = window.Tawk_API || {};
		window.Tawk_LoadStart = new Date();

		loadScript({
			propertyId : props.propertyId,
			widgetId : props.widgetId,
			embedId : props.embedId,
			basePath : props.basePath
		});

		if (props.customStyle && typeof props.customStyle === 'object') {
			window.Tawk_API.customStyle = props.customStyle;
		}

		mapCallbacks();
	};
	
	useImperativeHandle(ref, () => ({
	
		maximize : () => { 
			return window.Tawk_API.maximize();
		},

		minimize : () => {
			return window.Tawk_API.minimize();
		},

		toggle : () => {
			return window.Tawk_API.toggle();
		},

		popup : () => {
			return window.Tawk_API.popup();
		},

		showWidget : () => {
			return window.Tawk_API.showWidget();
		},

		hideWidget : () => {
			return window.Tawk_API.hideWidget();
		},

		toggleVisibility : () => {
			return window.Tawk_API.toggleVisibility();
		},

		endChat : () => {
			return window.Tawk_API.endChat();
		},

		getWindowType : () => {
			return window.Tawk_API.getWindowType();
		},

		getStatus : () => {
			return window.Tawk_API.getStatus();
		},

		isChatMaximized : () => {
			return window.Tawk_API.isChatMaximized();
		},

		isChatMinimized : () => {
			return window.Tawk_API.isChatMinimized();
		},

		isChatHidden : () => {
			return window.Tawk_API.isChatHidden();
		},

		isChatOngoing : () => {
			return window.Tawk_API.isChatOngoing();
		},

		isVisitorEngaged : () => {
			return window.Tawk_API.isVisitorEngaged();
		},

		onLoaded : () => {
			return window.Tawk_API.onLoaded;
		},

		onBeforeLoaded : () => {
			return window.Tawk_API.onBeforeLoaded;
		},

		widgetPosition : () => {
			return window.Tawk_API.widgetPosition();
		},

		visitor : (data) => {
			window.Tawk_API.visitor = data;
		},

		setAttributes : (attribute, callback) => {
			window.Tawk_API.setAttributes(attribute, callback);
		},

		addEvent : (event, metadata, callback) => {
			window.Tawk_API.addEvent(event, metadata, callback);
		},

		addTags : (tags, callback) => {
			window.Tawk_API.addTags(tags, callback);
		},

		removeTags : (tags, callback) => {
			window.Tawk_API.removeTags(tags, callback);
		}
	}));

	const mapCallbacks = () => {
		window.addEventListener('tawkLoad', () => {
			props.onLoad();
		});

		window.addEventListener('tawkStatusChange', (status) => {
			props.onStatusChange(status.detail);
		});

		window.addEventListener('tawkBeforeLoad', () => {
			props.onBeforeLoad();
		});

		window.addEventListener('tawkChatMaximized', () => {
			props.onChatMaximized();
		});

		window.addEventListener('tawkChatMinimized', () => {
			props.onChatMinimized();
		});

		window.addEventListener('tawkChatHidden', () => {
			props.onChatHidden();
		});

		window.addEventListener('tawkChatStarted', () => {
			props.onChatStarted();
		});

		window.addEventListener('tawkChatEnded', () => {
			props.onChatEnded();
		});

		window.addEventListener('tawkPrechatSubmit', (data) => {
			props.onPrechatSubmit(data.detail);
		});

		window.addEventListener('tawkOfflineSubmit', (data) => {
			props.onOfflineSubmit(data.detail);
		});
		
		window.addEventListener('tawkChatMessageVisitor', (message) => {
			props.onChatMessageVisitor(message.detail);
		});

		window.addEventListener('tawkChatMessageAgent', (message) => {
			props.onChatMessageAgent(message.detail);
		});

		window.addEventListener('tawkChatMessageSystem', (message) => {
			props.onChatMessageSystem(message.detail);
		});

		window.addEventListener('tawkAgentJoinChat', (data) => {
			props.onAgentJoinChat(data.detail);
		});
		
		window.addEventListener('tawkAgentLeaveChat', (data) => {
			props.onAgentLeaveChat(data.detail);
		});

		window.addEventListener('tawkChatSatisfaction', (satisfaction) => {
			props.onChatSatisfaction(satisfaction.detail);
		});
		
		window.addEventListener('tawkVisitorNameChanged', (visitorName) => {
			props.onVisitorNameChanged(visitorName.detail);
		});

		window.addEventListener('tawkFileUpload', (link) => {
			props.onFileUpload(link.detail);
		});

		window.addEventListener('tawkTagsUpdated', (data) => {
			props.onTagsUpdated(data.detail);
		});

		window.addEventListener('tawkUnreadCountChanged', (data) => {
			props.onUnreadCountChanged(data.detail);
		});
	};

	return null;
});

TawkMessenger.displayName = 'TawkMessenger';

TawkMessenger.defaultProps = {
	customStyle : null,
	embedId : '',
	basePath : 'tawk.to',
	onLoad : () => {},
	onStatusChange : () => {},
	onBeforeLoad : () => {},
	onChatMaximized : () => {},
	onChatMinimized : () => {},
	onChatHidden : () => {},
	onChatStarted : () => {},
	onChatEnded : () => {},
	onPrechatSubmit : () => {},
	onOfflineSubmit : () => {},
	onChatMessageVisitor : () => {},
	onChatMessageAgent : () => {},
	onChatMessageSystem : () => {},
	onAgentJoinChat : () => {},
	onAgentLeaveChat : () => {},
	onChatSatisfaction : () => {},
	onVisitorNameChanged : () => {},
	onFileUpload : () => {},
	onTagsUpdated : () => {},
	onUnreadCountChanged : () => {}
};


TawkMessenger.propTypes = {

	propertyId : PropTypes.string.isRequired,
	widgetId : PropTypes.string.isRequired,

	customStyle : PropTypes.object,
	embedId : PropTypes.string,
	basePath : PropTypes.string,

	onLoad : PropTypes.func,
	onStatusChange : PropTypes.func,
	onBeforeLoad : PropTypes.func,
	onChatMaximized : PropTypes.func,
	onChatMinimized : PropTypes.func,
	onChatHidden : PropTypes.func,
	onChatStarted : PropTypes.func,
	onChatEnded : PropTypes.func,
	onPrechatSubmit : PropTypes.func,
	onOfflineSubmit : PropTypes.func,
	onChatMessageVisitor : PropTypes.func,
	onChatMessageAgent : PropTypes.func,
	onChatMessageSystem : PropTypes.func,
	onAgentJoinChat : PropTypes.func,
	onAgentLeaveChat : PropTypes.func,
	onChatSatisfaction : PropTypes.func,
	onVisitorNameChanged : PropTypes.func,
	onFileUpload : PropTypes.func,
	onTagsUpdated : PropTypes.func,
	onUnreadCountChanged : PropTypes.func
};


export default TawkMessenger;
