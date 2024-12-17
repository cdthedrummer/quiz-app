import * as React from "react"

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className = "", value, onValueChange, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`grid gap-2 ${className}`} {...props}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              checked: child.props.value === value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                onValueChange?.(e.target.value)
              },
              name: props.id || 'radio-group'
            })
          }
          return child
        })}
      </div>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          ref={ref}
          className={`h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
          {...props}
        />
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {children}
        </span>
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }