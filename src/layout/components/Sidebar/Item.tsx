import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const renderItem = () => {
      const vnodes = []

      if (props.icon) {
        if (props.icon.includes('el-icon')) {
          vnodes.push(<i class={[props.icon, 'sub-el-icon']} />)
        } else {
          vnodes.push(<svg-icon icon-class={props.icon} />)
        }
      }
      return vnodes
    }

    return () => {
      return renderItem()
    }
  }
})
