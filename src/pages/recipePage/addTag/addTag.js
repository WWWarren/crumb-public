addTag = (values) => {
  const arr = [
    ...this.state.tags,
  ];
  const tags = arr.concat(values.tag);
  this.setState(() => ({
    tags,
  }));
  this.props.reset('addTag');
}

<div>
  <Form
    form="addTag"
    onSubmit={(values) => this.addTag(values)}
    submitText="Add"
  >
    <Field
      name="tag"
      labelText="Recipe Tags"
      placeholder="Enter tag text"
      component={TextField}
    />
  </Form>
  {
    this.state.tags.map((t, i) => (
      <div key={i}>
        {t}
        <PrimaryButton
          type="button"
          onClick={() => this.removeTag(t)}
        >
          Remove
        </PrimaryButton>
      </div>
    ))
  }
</div>
