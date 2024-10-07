# Lightning-Web-Components-Extended
A collection of custom Salesforce Lightning Web Components that I use to make development easier and faster.

Multi Button Select
accepts an array of button groups. can be a single group but must be within an array. Each group must have a label and a buttons property. the buttons property must be an array of available buttons. optional properties are 'defaultVariant' and 'activeVariant'. default variant is the variant used when the button is not selected. active variant is the variant used when the button is selected.

buttons must have a label property. 
optional properties:
isAllButton - when this button is active, all other 'non-isAllButton' buttons are made inactive, when other 'non-isAllButton' buttons are made active this button is made inactive. functions similar to a radio button group
isActive - is this button active
class - a class to give the button
activeVariant - the variant for the button when active. overrides group settings
defaultVariant - the variant when button is inactive. overrides group settings
iconName - gives the button an icon

to communicate with the parent this sends a custom event
onselect
onselect passes 4 properties
group - the label of the group
label - the label of the button
activeButtons - an array of strings containing all active button labels
inactiveButtons - an array of strings containing all inactive button labels

examples-

const OBJECT = {
  label: 'object',
  defaultVariant: 'brand-outline',
  activeVariant: 'Success',
  buttons: [
    {
      label: 'All',
      isAllButton: true,
      isActive: true,
      activeVariant: 'destructive',
      iconName: 'utility:overflow'
    },
    {
      label: 'Account',
      isActive: true,
      activeVariant: 'success',
      iconName: 'utility:company'
    },
    {
      label: 'Contact',
      isActive: false,
      defaultVariant: 'destructive-text',
      iconName: 'utility:contact'
    },
    {
      label: 'Lead',
      isActive: false,
      iconName: 'utility:lead'
    },
  ]
}

  handleButtonSelect(event){
    console.log(event.detail.group)
    console.log(event.detail.label)
    console.log(JSON.stringify(event.detail.activeButtons))
    console.log(JSON.stringify(event.detail.inactiveButtons))
  }
