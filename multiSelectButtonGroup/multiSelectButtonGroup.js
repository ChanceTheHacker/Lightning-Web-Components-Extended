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
        button.currentVariant = button.isActive ? button.activeVariant : button.inactiveVariant;

        const shouldButtonsSwap = button.isActive && hasAllButton;
        const activeButtonLabels = [];
        const inactiveButtonLabels = [];
        const activeButtonValues = [];
        const inactiveButtonValues = [];

        for (let btn of group.buttons){

            if (shouldButtonsSwap && btn.isAllButton !== isAllButton){
                btn.isActive = !button.isActive;
                btn.currentVariant = btn.isActive ? btn.activeVariant : btn.inactiveVariant;
            }

            btn.isActive ? activeButtonLabels.push(btn.label) : inactiveButtonLabels.push(btn.label);
            btn.isActive ? activeButtonValues.push(btn.value) : inactiveButtonValues.push(btn.value);
        }

        this.dispatchEvent(new CustomEvent('select', {
            detail: {
                groupLabel,
                label,
                activeButtonLabels,
                inactiveButtonLabels,
                activeButtonValues,
                inactiveButtonValues,
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
                        newButton.value = button.value ? button.value : button.label;
                        newButton.isAllButton = button.isAllButton ? true : false;
                        newGroup.hasAllButton = newButton.isAllButton ? true : newGroup.hasAllButton;
                        newButton.isActive = button.isActive ? true : false;
                        newButton.inactiveVariant = button.inactiveVariant ? button.inactiveVariant : group.inactiveVariant;
                        newButton.activeVariant = button.activeVariant ? button.activeVariant : group.activeVariant;
                        newButton.currentVariant = button.isActive ? button.activeVariant : button.inactiveVariant;
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
