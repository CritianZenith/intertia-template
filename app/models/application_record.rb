class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def as_json(options = {})
    super(options).merge({
      "id" => self.to_gid_param
    })
  end
end
