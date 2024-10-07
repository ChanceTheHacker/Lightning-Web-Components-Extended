import { LightningElement, track, api } from 'lwc';

export default class MultiSelectButtonGroup extends LightningElement {
    @api groups;
    @track groupsData;
    @track displayGroups = false;
    groupsBackup;


    handleButtonClick(event){
        const target = event.target;
        const {label, groupLabel, index, groupIndex, isActive} = target;
        const group = this.groupsData[groupIndex];
        const hasAllButton = group.hasAllButton;
        const button = group.buttons[index];
        const isAllButton = button.isAllButton;
        button.isActive = !isActive;
        button.currentVariant = button.isActive ? button.activeVariant : button.defaultVariant;

        const shouldButtonsSwap = button.isActive && hasAllButton;
        const activeButtonLabels = [];
        const inactiveButtonLabels = [];

        for (let btn of group.buttons){

            if (shouldButtonsSwap && btn.isAllButton !== isAllButton){
                btn.isActive = !button.isActive;
                btn.currentVariant = btn.isActive ? btn.activeVariant : btn.defaultVariant;
            }

            btn.isActive ? activeButtonLabels.push(btn.label) : inactiveButtonLabels.push(btn.label);
        }

        this.dispatchEvent(new CustomEvent('select', {
            detail: {
                group: groupLabel, label: label, activeButtons: activeButtonLabels, inactiveButtons: inactiveButtonLabels
            }
        }));
    }

    renderedCallback(){
        const groups = this.groups;
        const groupsString = JSON.stringify(groups)
        if (groups.length > 0 && groupsString !== this.groupsBackup){
            this.groupsBackup = groupsString;
            const newGroupsData = [];

            for (const group of groups){
                const newGroup = {};
                newGroup.label = group.label;
                newGroup.hasAllButton = false;
                newGroup.buttons = [];
                if (group.buttons.length > 0){

                    for (const button of group.buttons){
                        const newButton = {};
                        newButton.groupLabel = group.label;
                        newButton.label = button.label;
                        newButton.isAllButton = button.isAllButton ? true : false;
                        newGroup.hasAllButton = newButton.isAllButton ? true : newGroup.hasAllButton;
                        newButton.isActive = button.isActive ? true : false;
                        newButton.defaultVariant = button.defaultVariant ? button.defaultVariant : group.defaultVariant;
                        newButton.activeVariant = button.activeVariant ? button.activeVariant : group.activeVariant;
                        newButton.currentVariant = button.isActive ? button.activeVariant : button.defaultVariant;
                        newButton.class = button.class ? button.class : '';
                        newButton.iconName = button.iconName;
                        newGroup.buttons.push(newButton);

                    }
                    newGroupsData.push(newGroup);
                    
                }

            }

            this.groupsData = newGroupsData;
            this.displayGroups = true;
        } else {
            if (groups.length === 0){
                this.displayGroups = false;
            }
        }
        
    }

}