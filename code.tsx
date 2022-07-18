/* 
This is Figma widget that contains a basic, best-practice checklist for design system component development

When placed on the Figma canvas near a component, the idea is that the checklist items help ensure the component is properly structured and robust enough for use in a design system setting.

*/

const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG } = widget

// src for SVG element for the various statuses
const successIcon = `
<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M0 16C0 7.1625 7.1625 0 16 0C24.8375 0 32 7.1625 32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16ZM23.2375 13.2375C23.9187 12.5563 23.9187 11.4437 23.2375 10.7625C22.5562 10.0813 21.4438 10.0813 20.7625 10.7625L14 17.525L11.2375 14.7625C10.5563 14.0813 9.44375 14.0813 8.7625 14.7625C8.08125 15.4437 8.08125 16.5562 8.7625 17.2375L12.7625 21.2375C13.4437 21.9187 14.5563 21.9187 15.2375 21.2375L23.2375 13.2375Z' fill='#009B06'/>
</svg>
`

const undeterminedIcon = `
<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M31.5 16C31.5 24.5614 24.5614 31.5 16 31.5C7.43864 31.5 0.5 24.5614 0.5 16C0.5 7.43864 7.43864 0.5 16 0.5C24.5614 0.5 31.5 7.43864 31.5 16Z' fill='white' stroke='#B1B1B1'/>
</svg>
`

const failureIcon = `
<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M0 16C0 7.1625 7.1625 0 16 0C24.8375 0 32 7.1625 32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16ZM10.9375 13.0063L13.8813 15.9438L10.9375 18.9375C10.3562 19.525 10.3562 20.475 10.9375 21.0063C11.525 21.6438 12.475 21.6438 13.0063 21.0063L15.9438 18.1187L18.9375 21.0063C19.525 21.6438 20.475 21.6438 21.0063 21.0063C21.6438 20.475 21.6438 19.525 21.0063 18.9375L18.1187 15.9438L21.0063 13.0063C21.6438 12.475 21.6438 11.525 21.0063 10.9375C20.475 10.3562 19.525 10.3562 18.9375 10.9375L15.9438 13.8813L13.0063 10.9375C12.475 10.3562 11.525 10.3562 10.9375 10.9375C10.3562 11.525 10.3562 12.475 10.9375 13.0063Z' fill='#C20000'/>
</svg>
`

const notApplicableIcon = `
<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M0 16C0 7.1625 7.1625 0 16 0C24.8375 0 32 7.1625 32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16ZM10.5 14.5C9.66875 14.5 9 15.1687 9 16C9 16.8312 9.66875 17.5 10.5 17.5H21.5C22.3312 17.5 23 16.8312 23 16C23 15.1687 22.3312 14.5 21.5 14.5H10.5Z' fill='#6B6B6B'/>
</svg>
`



function Widget() {

// available status labels and icons
const statusIcons = [
  {
    label: "Undetermined",
    icon: undeterminedIcon
  },
  {
    label: "Success",
    icon: successIcon
  },
  {
    label: "Failure",
    icon: failureIcon
  },
  {
    label: "Not applicable",
    icon: notApplicableIcon
  }
]
// initial state
  const initialRubricItems = [
    {
      position: 0,
      title: "Name",
      criteria: "Is the name of the component consistent with the codebase and documentation?",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 1,
      title: "Layers",
      criteria: "Are layer names formatted with meaningful values? (No Frame 234)",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 2,
      title: "Color styles",
      criteria: "Are all the colors from a style library / token and not hard-coded?",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 3,
      title: "Text styles",
      criteria: "Is each text layer from a defined text style library / token?",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 4,
      title: "Spacing, padding and alignment",
      criteria: "Are spacing, padding, and alignment values consistently applied and visually aligned?",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 5,
      title: "Variants and component properties",
      criteria: "Are variant and component properties correctly named? Consistent with code and among other components?",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 6,
      title: "States",
      criteria: "Are all the interactive states accounted for? (e.g., hover, focus, pressed)",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 7,
      title: "Content",
      criteria: "Does the component behave as expected with non-optimal concent is present? (e.g., long strings)",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 8,
      title: "Layout",
      criteria: "Does the component behave as expected when resized? (e.g., wrapping, alignment, text layer flow)",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 9,
      title: "Configuration",
      criteria: "Can all the required variations and states be acheived through the component properties panel? \n(e.g., no digging through Layers)",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    }
  ]  

  const [rubricItems, setRubricItems] = useSyncedState ('rubricItems', () => initialRubricItems)
  const [lastUpdate, setLastUpdate] = useSyncedState('lastUpdate', null)

  function getNextStatus (currentStatus) {
    // based on the current status, find the next status and return it
    const currentIndex = statusIcons.findIndex(item => item.label === currentStatus)
    if(currentIndex >= 0 && currentIndex < statusIcons.length - 1) {  
      return statusIcons[currentIndex+1]
    } else if (currentIndex === statusIcons.length -1) {
      return statusIcons[0]
    } else {
      throw Error ("Status out of bounds")
    }
  }


  function cycleStatus (item) {
    // click event copies current updates the selected item status to the next status
    setRubricItems(rubricItems => {
      const temp = [...rubricItems]
      temp[item.position].status = getNextStatus(item.status.label)
      setLastUpdate(item.position)
      return temp
    })
  }


  return (
    <AutoLayout 
      direction="vertical" 
      fill="#FFFFFF"
      spacing={32} 
      padding={{
        top: 12, 
        right: 32, 
        bottom: 12, 
        left: 32 
      }}>
        
        {(lastUpdate !== null) ? 
          <Text fill="#999" fontSize={14}>{`${rubricItems[lastUpdate].title} set to "${rubricItems[lastUpdate].status.label}"`}</Text>
          :
          <Text fill="#999" fontSize={14}>Toggle checklist status to success, failure, or not applicable</Text>
        }
      {
        rubricItems.map((item, index) => {
          return (
            <AutoLayout
              key={index}
              name="Rubric"
              overflow="visible"
              spacing={24}
              width={900}
              verticalAlignItems="start"
              padding={{
                top: 0,
                right: 0,
                bottom: 12,
                left: 0,
              }}
              
            >
              <AutoLayout
                name="Status"
                overflow="visible"
                horizontalAlignItems="end"
                verticalAlignItems="center"
              >
                <SVG src={item.status.icon} onClick={() => cycleStatus(item)} />
              </AutoLayout>
              <AutoLayout
                name="Rubric Text"
                overflow="visible"
                direction="vertical"
                spacing={8}
                width="fill-parent"
              >
                <Text
                  name="Title"
                  fill="#000"
                  fontFamily="Inter"
                  fontSize={20}
                  fontWeight={500}
                >
                  {item.title}
                </Text>
                <Text
                  name="Description"
                  fill="#555"
                  fontFamily="Inter"
                  
                >
                  {item.criteria}
                </Text>
              </AutoLayout>
            </AutoLayout>
          )
        })
      }

    </AutoLayout>
      
    
    
  )
}

widget.register(Widget)
