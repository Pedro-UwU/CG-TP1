def main():
    curve = 'M1,0.8 L1,-0.8 L3.8,-0.8 C3.8,-3.8 3.8,-3.8 0.8,-3.8 L0.8,-1 L-0.8,-1 L-0.8,-3.8 C-3.8,-3.8 -3.8,-3.8 -3.8,-0.8 L-1,-0.8 L-1,0.8 L-3.8,0.8 C-3.8,3.8 -3.8,3.8 -0.8,3.8 L-0.8,1 L0.8,1 L0.8,3.8 C3.8,3.8 3.8,3.8 3.8,0.8 L1,0.8'
    commands = curve.split(' ')
    controls = []
    scale = 8
    print(commands)
    for command in commands:
        if command.startswith("M"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            print(f"shape.moveTo({numbers[0]},{numbers[1]})")
        elif command.startswith("L"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            print(f'shape.lineTo({numbers[0]},{numbers[1]})')
        elif command.startswith("C"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            controls = []
            controls.append(numbers[0])
            controls.append(numbers[1])
        else:
            numbers = [float(x)/scale for x in command.split(',')]
            controls.append(numbers[0])
            controls.append(numbers[1])
            if (len(controls) == 6):
                print(f'shape.bezierCurveTo({controls[0]},{controls[1]},{controls[2]},{controls[3]},{controls[4]},{controls[5]})')



if __name__ == "__main__":
    main()