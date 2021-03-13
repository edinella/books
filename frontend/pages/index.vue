<script>
export default {
  middleware: [
    function({ redirect }) {
      redirect("/books");
    }
  ]
};
</script>
