export namespace DOM {
    
    export namespace Utility {
        export function getElement(tag_name: string): HTMLElement | null {
            return document.querySelector(tag_name);
        }
    }
}