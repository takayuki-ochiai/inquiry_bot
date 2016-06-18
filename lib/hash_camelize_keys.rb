module HashCamelizeKeys
  # まずキーの形で来た時に対応していない
  # ネストにも対応していない
  refine Hash do
    unless method_defined?(:camelize_keys)
      def camelize_keys(first_letter = :upper)
        deep_transform_keys do |key|
          if key.is_a?(::String)
            key = key.camelize(first_letter)
          end

          if key.is_a?(::Symbol)
            key = key.to_s.camelize(first_letter).to_sym
          end
          key
        end
      end
    end

    unless method_defined?(:camelize_keys!)
      def camelize_keys!(first_letter = :upper)
        deep_transform_keys! do |key|
          if key.is_a?(::String)
            key = key.camelize(first_letter)
          end

          if key.is_a?(::Symbol)
            key = key.to_s.camelize(first_letter).to_sym
          end
          key
        end
      end
    end
  end
end
