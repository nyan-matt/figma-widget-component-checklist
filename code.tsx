/* 
This is Figma widget that contains a basic, best-practice checklist for design system component development

When placed on the Figma canvas near a component, the idea is that the checklist items help ensure the 
component is properly structured and robust enough for use in a design system setting.

*/

const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, Ellipse, Rectangle, SVG } = widget

// src for SVG element for the various statuses
const successIcon = `
<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M0 16C0 7.1625 7.1625 0 16 0C24.8375 0 32 7.1625 32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16ZM23.2375 13.2375C23.9187 12.5563 23.9187 11.4437 23.2375 10.7625C22.5562 10.0813 21.4438 10.0813 20.7625 10.7625L14 17.525L11.2375 14.7625C10.5563 14.0813 9.44375 14.0813 8.7625 14.7625C8.08125 15.4437 8.08125 16.5562 8.7625 17.2375L12.7625 21.2375C13.4437 21.9187 14.5563 21.9187 15.2375 21.2375L23.2375 13.2375Z' fill='#009B06'/>
</svg>
`

const undeterminedIcon = `
<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16C0 7.1625 7.1625 0 16 0C24.8375 0 32 7.1625 32 16Z' fill='#B1B1B1'/>
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
      title: "All layers and frames have meaningful names",
      criteria: "Criteria for a passing item can be listed here",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 1,
      title: "Item title 2",
      criteria: "Criteria for a passing item can be listed here",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 2,
      title: "Item title 3",
      criteria: "Criteria for a passing item can be listed here",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 3,
      title: "Item title 4",
      criteria: "Criteria for a passing item can be listed here",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    },
    {
      position: 4,
      title: "Item title 5",
      criteria: "Criteria for a passing item can be listed here",
      status: {
        label: "Undetermined",
        icon: undeterminedIcon
      }
    }
  ]  

  const [rubricItems, setRubricItems] = useSyncedState ('rubricItems', () => initialRubricItems)
  
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


  function cycleStatus(item) {
    // click event copies current updates the selected item status to the next status
    setRubricItems(rubricItems => {
      const temp = [...rubricItems]
      temp[item.position].status = getNextStatus(item.status.label)
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
  
      {
        rubricItems.map((item, index) => {
          return (
            <AutoLayout
              key={index}
              name="Rubric"
              overflow="visible"
              spacing={32}
              width={700}
              verticalAlignItems="center"
              onClick={() => cycleStatus(item)}
            >
              <AutoLayout
                name="Status"
                overflow="visible"
                spacing={8}
                padding={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 16,
                }}
                horizontalAlignItems="end"
                verticalAlignItems="center"
              >
                
                <SVG src={item.status.icon} />
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
                  fontSize={18}
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
