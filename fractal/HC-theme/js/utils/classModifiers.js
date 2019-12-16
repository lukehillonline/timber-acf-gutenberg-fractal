export function addClass(element, className) {
    const currentClasses = String(element.className);
    if (currentClasses.indexOf(className) > 0) {
        return;
    }
    const newClass = `${currentClasses} ${className}`;
    element.setAttribute('class', newClass.trim());
}

export function removeClass(element, className) {
    const currentClasses = String(element.className);
    if (currentClasses.indexOf(className) >= 0) {
        const newClass = currentClasses.replace(className, '');
        element.setAttribute('class', newClass.trim());
    }
}

export function hasClass(element, className) {
    const currentClasses = String(element.className);
    return currentClasses.indexOf(className) >= 0 || false;
}
