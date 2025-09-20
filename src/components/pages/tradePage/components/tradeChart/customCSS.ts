export const useCustomCSS = () => {
  return `:root:not(.theme-dark) {
				--tv-color-platform-background: "#000910";
				--tv-color-pane-background: "#000910";
				--tv-color-toolbar-button-background-hover: "#000910";
				--tv-color-toolbar-button-background-expanded: "#000910";
				--tv-color-toolbar-button-background-active: "#000910";
				--tv-color-toolbar-button-background-active-hover: "#1da0f2";
				--tv-color-toolbar-button-text: "#f8f9fa";
				--tv-color-toolbar-button-text-hover: "#1da0f2";
				--tv-color-toolbar-button-text-active: "#1f73b7";
				--tv-color-toolbar-button-text-active-hover: "#1da0f2";
				--tv-color-item-active-text: "#1f73b7";
				--tv-color-toolbar-toggle-button-background-active: "#1f73b7";
				--tv-color-toolbar-toggle-button-background-active-hover: "#1da0f2";
				--tv-color-toolbar-divider-background: "#000910";
			}
			.theme-dark:root {
				--tv-color-platform-background: "#f7f7f7";
				--tv-color-pane-background: "#f7f7f7";
				--tv-color-toolbar-button-background-hover: "#f7f7f7";
				--tv-color-toolbar-button-background-expanded: "#f7f7f7";
				--tv-color-toolbar-button-background-active: "#f7f7f7";
				--tv-color-toolbar-button-background-active-hover: "#1da0f2";
				--tv-color-toolbar-button-text: "#121212";
				--tv-color-toolbar-button-text-hover: "#1da0f2";
				--tv-color-toolbar-button-text-active: "#1f73b7";
				--tv-color-toolbar-button-text-active-hover: "#1da0f2";
				--tv-color-item-active-text: "#1f73b7";
				--tv-color-toolbar-toggle-button-background-active: "#1f73b7";
				--tv-color-toolbar-toggle-button-background-active-hover: "#1da0f2";
				--tv-color-toolbar-divider-background: "#f7f7f7";
			}
		
			`;
};
