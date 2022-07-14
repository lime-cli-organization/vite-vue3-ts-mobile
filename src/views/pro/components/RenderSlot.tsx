import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    return () => {
      return (
        <div>这是一个slot</div>
      )
    }
  }
})

